class Point < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :marker_id, :map

  acts_as_gmappable :lat => 'latitude', 
                    :lng => 'longitude',
                    :process_geocoding => false

  after_create :update_map
  after_update :update_map
  belongs_to :map

  def update_map
    m = self.map
    m.updated = Time.now
    m.save
  end
end
