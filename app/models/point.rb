class Point < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :marker_id

  acts_as_gmappable :lat => 'latitude', 
                    :lng => 'longitude',
                    :process_geocoding => false
end
