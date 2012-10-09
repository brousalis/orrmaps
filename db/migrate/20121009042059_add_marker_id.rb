class AddMarkerId < ActiveRecord::Migration
  def up
    add_column :points, :marker_id, :string #not mandatory, see wiki
  end

  def down
  end
end
