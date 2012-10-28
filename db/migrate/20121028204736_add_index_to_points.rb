class AddIndexToPoints < ActiveRecord::Migration
  def change
    add_index :points, :map_id, :name => 'map_id_points_ix'
  end
end
