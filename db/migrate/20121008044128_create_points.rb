class CreatePoints < ActiveRecord::Migration
  def change
    create_table :points do |t|
      t.float :latitude, :null => false
      t.float :longitude, :null => false
      t.string :marker_id, :null => false
      t.references :map
      t.timestamps
    end
  end
end
