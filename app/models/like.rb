class Like < ActiveRecord::Base
  attr_accessible :user, :map

  belongs_to :map
  belongs_to :user
end
