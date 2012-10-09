class AddGmaps < ActiveRecord::Migration
  def up
    add_column :points, :latitude,  :float #you can change the name, see wiki
    add_column :points, :longitude, :float #you can change the name, see wiki
    add_column :points, :gmaps, :boolean #not mandatory, see wiki
  end

  def down
  end
end
