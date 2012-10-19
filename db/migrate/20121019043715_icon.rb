class Icon < ActiveRecord::Migration
  def up
    add_column :points, :icon, :string
  end

  def down
  end
end
