class RemoteUnusedTables < ActiveRecord::Migration
  def up
    drop_table :votes
    drop_table :likes
  end

  def down
  end
end
