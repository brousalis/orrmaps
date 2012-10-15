class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.references :user
      t.references :server
      t.references :point

      t.timestamps
    end
  end
  add_column :points, :map_id, :integer
end
