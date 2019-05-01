require 'rails_helper'

RSpec.describe ReadEntriesController, type: :controller do
  let!(:user)   { create(:user) }
  let!(:book)   { create(:book) }
  let!(:header) {{ 'X-User-Token': user.authentication_token }}

  describe 'POST #create' do
    before(:each) do
      request.headers.merge! header
    end

    context 'with valid params' do
      let!(:valid_params) {{ book_id: book.id, read_entry: { pages: 20, date: Date.current, book_id: book.id }}}

      it 'successfully creates read entry' do
        expect{ post :create, params: valid_params }.to change{ ReadEntry.count }.by(1)
      end
    end

    context 'with invalid params' do
      let!(:invalid_params) {{ book_id: book.id, read_entry: { pages: nil, date: Date.current, book_id: book.id } }}

      it 'does not create read entry' do
        expect{ post :create, params: invalid_params }.not_to change{ ReadEntry.count }
      end

      it 'returns correct error message' do
        post :create, params: invalid_params
        res = JSON.parse(response.body)
        expect(res['error'][0]).to eq("Pages can't be blank")
      end

      it 'returns 422 status' do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

end
