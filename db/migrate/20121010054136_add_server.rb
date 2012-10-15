class AddServer < ActiveRecord::Migration
  def up
    add_column :servers, :name, :string #not mandatory, see wiki
  end

  def down
  end
end
