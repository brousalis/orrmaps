class Upvotes < ActiveRecord::Migration
  def up
    add_column :points, :votes, :integer, :null => false, :default => 5
    add_column :points, :icon, :strong
  end

  def down
  end
end
