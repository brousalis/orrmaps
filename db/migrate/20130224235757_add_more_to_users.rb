class AddMoreToUsers < ActiveRecord::Migration
  def change
    remove_column :points, :votes
    add_column :users, :email, :string
    add_column :users, :twitter, :string
    add_column :users, :donor, :integer, :default => 0
  end
end
