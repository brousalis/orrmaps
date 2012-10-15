class Point < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :marker_id, :map

  acts_as_gmappable :lat => 'latitude', 
                    :lng => 'longitude',
                    :process_geocoding => false

  belongs_to :map

  before_save :assign_user

  def assign_user 
    self.map = current_user.map if current_user
  end
end
