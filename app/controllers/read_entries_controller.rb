class ReadEntriesController < ApplicationController
  def create
    read_entry = current_user.read_entries.build(read_entry_params)

    if read_entry.save
      head :no_content
      # no content because we gather read entries onrder to get
      # monthly read stats for user. Read entry itself is not
      # displayed anywhere
    else
      render json: { error: read_entry.errors.full_messages }, status: 422
    end
  end

  private

    def read_entry_params
      params.require(:read_entry).permit(:pages, :date, :book_id)
    end
end
