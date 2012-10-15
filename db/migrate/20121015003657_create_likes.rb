class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.references :map
      t.references :user

      t.timestamps
    end
  end
  add_column :users, :map_id, :integer
  add_column :users, :server_id, :integer
end
