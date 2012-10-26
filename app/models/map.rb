class Map < ActiveRecord::Base
  attr_accessible :user, :server, :points, :likes

  has_one :user
  belongs_to :server
  has_many :likes
  has_many :points

  def find_points_by(node)
    self.points.find_all_by_icon("/assets/tiles/#{node}.png")
  end
end
