class Server < ActiveRecord::Base
  attr_accessible :name, :country, :maps
  belongs_to :user
  has_many :maps

  def likes
    $redis.zrange(likes_count_key, 0, -1, :with_scores => true)
  end

  def likes_count
    likes.inject(0) { |sum, num| sum += num.last.to_i }
  end

  def top_map
    $redis.zrange(likes_count_key, -1, -1)
  end

  def second_top_map
    $redis.zrange(likes_count_key, -2, -2)
  end

  def rest_of_maps
    $redis.zrange(likes_count_key, 0, -3)
  end

  def likes_count_key
    "map:#{self.id}:likes"
  end
end
