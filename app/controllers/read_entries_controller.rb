class ReadEntriesController < ApplicationController
  def create
    read_entry = current_user.read_entries.build(read_entry_params)

    if read_entry.save
      render json: read_entry
    else
      render json: { error: read_entry.errors.full_messages }
    end
  end

  private

    def read_entry_params
      params.require(:read_entry).permit(:pages, :date, :book_id)
    end
end
