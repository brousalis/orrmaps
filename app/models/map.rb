class Map < ActiveRecord::Base
  attr_accessible :user, :server, :points, :likes

  belongs_to :user
  belongs_to :server
  has_many :likes
  has_many :points

  def find_points_by(node)
    self.points.find_all_by_icon("/assets/tiles/#{node}.png")
  end
end
