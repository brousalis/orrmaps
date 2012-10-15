class AddCc < ActiveRecord::Migration
  def up
    add_column :servers, :country, :string #not mandatory, see wiki
  end

  def down
  end
end
