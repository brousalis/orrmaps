class Point < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :marker_id, :map, :votes, :icon, :note

  acts_as_gmappable :lat => 'latitude', 
                    :lng => 'longitude',
                    :process_geocoding => false

  after_create :update_map
  after_update :update_map
  belongs_to :map
  has_one :note, :dependent => :destroy

  def update_map
    m = self.map
    m.updated_at = Time.now
    m.save
  end

  def to_hash
    hash = {
      :latitude => self.latitude,
      :longitude => self.longitude,
      :marker_id => self.marker_id,
      :icon => self.icon
    }
    hash[:note] = self.note.content if self.note
    hash
  end
end
