class Map < ActiveRecord::Base
  attr_accessible :user, :server, :points

  has_one :user
  belongs_to :server
  has_many :points

  def find_points_by(node)
    self.points.find_all_by_icon("/assets/tiles/#{node}.png")
  end

  def like(user)
    $redis.multi do
      $redis.incr(self.redis_key(:score))
      $redis.sadd(self.redis_key(:user), user.id)
    end
  end

  def unlike(user)

  end

  def dislike(user)

  end

  def redis_key(str)
    "map:#{self.id}:#{str}"
  end
end
