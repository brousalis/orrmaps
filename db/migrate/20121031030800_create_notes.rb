class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :content
      t.references :point
      t.timestamps
    end
    add_column :points, :note_id, :integer
  end
end
