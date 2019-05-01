require 'rails_helper'

RSpec.describe StatisticsController, type: :controller do
  let!(:user)       { create(:user, :with_assigned_book) }
  let!(:read_entry) { create(:read_entry, user_id: user.id, book_id: user.books.first.id) }
  let!(:header)     {{ 'X-User-Token': user.authentication_token }}

  describe 'GET #show' do
    it 'returns correct data' do
      request.headers.merge! header
      get :show
      res = JSON.parse(response.body)
      expect(res['data'][0]['book']['title']).to eq(user.books.first.title)
      expect(res['data'][0]['pages']).to eq(user.read_entries.first.pages)
    end
  end
end
