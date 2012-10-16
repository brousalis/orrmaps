class Server < ActiveRecord::Base
  attr_accessible :name, :country, :maps
  belongs_to :user
  has_many :maps
end
