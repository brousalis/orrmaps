class Anotheremail < ActiveRecord::Migration
  def up
    remove_index :users, :column => :email
  end

  def down
  end
end
