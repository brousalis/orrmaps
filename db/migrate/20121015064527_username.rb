class Username < ActiveRecord::Migration
  def up
    change_column :users, :name, :string, :null => false
  end

  def down
  end
end
