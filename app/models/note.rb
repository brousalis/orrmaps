class Note < ActiveRecord::Base
  attr_accessible :content, :point
  belongs_to :point
end
