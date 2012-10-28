class AddIndexToLikes < ActiveRecord::Migration
  def change
    add_index :likes, :map_id,  :name => 'map_id_likes_ix'
  end
end
