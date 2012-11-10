class Server < ActiveRecord::Base
  attr_accessible :name, :country, :maps
  belongs_to :user
  has_many :maps

  def likes
    $redis.zrange(likes_count_key, 0, -1, :with_scores => true)
  end

  def likes_count
    $redis.zcount(likes_count_key, '-inf', '+inf')
  end

  def likes_count_key
    "map:#{self.id}:likes"
  end
end
