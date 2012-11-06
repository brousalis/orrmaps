class Map < ActiveRecord::Base
  attr_accessible :user, :server, :points

  has_one :user
  belongs_to :server
  has_many :points

  def find_points_by(node)
    self.points.find_all_by_icon("/assets/tiles/#{node}.png")
  end

  def likes
    $redis.get(self.redis_key(:score)) || 0
  end

  def already_likes?(user)
    $redis.hexists(self.redis_key(:user), user.id)
  end

  def like(user)
    $redis.multi do
      $redis.hincrby("map_scores", self.id, 1)
      $redis.hset(self.redis_key(:user), user.id, 1)
    end
  end

  def unlike(user)
    if score = $redis.hget(redis_key(:user), user.id)
      $redis.hdecrby("map_scores", self.id, 1) if score == '1'
      $redis.hincrby("map_scores", self.id, 1) if score == '-1'
      $redis.hdel(self.redis_key(:user), user.id)
    end
  end

  def dislike(user)
    $redis.multi do
      $redis.hdecrby("map_scores", self.id, 1) 
      $redis.hset(self.redis_key(:user), user.id, -1)
    end
  end

  def redis_key(str)
    "map:#{self.id}:#{str}"
  end
end
