class Change < ActiveRecord::Migration[5.2]
  def up
    change_column :read_entries, :date, :date
  end

  def down
    change_column :read_entries, :date, :datetime
  end
end
