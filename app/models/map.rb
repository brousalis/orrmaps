class Map < ActiveRecord::Base
  attr_accessible :user, :server, :points, :likes

  belongs_to :user
  belongs_to :server
  has_many :likes
  has_many :points

end
