class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.references :user
      t.references :server
      t.references :point
      t.timestamps
    end
  end
end
