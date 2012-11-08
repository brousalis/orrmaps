class Map < ActiveRecord::Base
  attr_accessible :user, :server, :points

  has_one :user
  belongs_to :server
  has_many :points

  def find_points_by(node)
    self.points.find_all_by_icon("/assets/tiles/#{node}.png")
  end

  def likes
    $redis.get(likes_count_key) || 0
  end

  def has_voted?(user)
    $redis.hexists(redis_key, user.id)
  end

  def already_likes?(user)
    $redis.hget(redis_key, user.id) == "1"
  end

  def already_dislikes?(user)
    $redis.hget(redis_key, user.id) == "-1"
  end

  def like(user)
    if already_likes?(user)
      unlike(user)
    else
      $redis.multi do
        $redis.incr(likes_count_key)
        $redis.hset(redis_key, user.id, 1)
      end
    end
  end

  def unlike(user)
    if score = $redis.hget(redis_key, user.id)
      $redis.incrby(likes_count_key, score.to_i * -1)
      $redis.hdel(redis_key, user.id)
    end
  end

  def dislike(user)
    if already_dislikes?(user)
      unlike(user)
    else
      $redis.multi do
        $redis.decr(likes_count_key)
        $redis.hset(redis_key, user.id, -1)
      end
    end
  end

  def redis_key
    "map:#{self.id}:users"
  end

  def likes_count_key
    "map:#{self.id}:likes"
  end
end
