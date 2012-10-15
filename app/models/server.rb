class Server < ActiveRecord::Base
  attr_accessible :name, :country,  :maps

  has_many :maps
end
