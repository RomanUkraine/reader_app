require 'rails_helper'

RSpec.describe AssignedBooksController, type: :controller do
  let!(:user)   { create(:user) }
  let!(:book)   { create(:book) }
  let!(:header) {{ 'X-User-Token': user.authentication_token }}

  describe 'POST #create' do
    before(:each) do
      request.headers.merge! header
    end

    context 'with valid params' do
      let!(:valid_params) {{ assigned_book: { user_id: user.id, book_id: book.id } }}

      it 'successfully assigns a book' do
        expect{ post :create, params: valid_params }.to change{ AssignedBook.count }.by(1)
      end
    end

    context 'with invalid params' do
      let!(:invalid_params) {{ assigned_book: { book_id: nil } }}

      it 'does not assign a book' do
        expect{ post :create, params: invalid_params }.not_to change{ AssignedBook.count }
      end

      it 'returns correct error message' do
        post :create, params: invalid_params
        res = JSON.parse(response.body)
        expect(res['error'][0]).to eq("Book must exist")
      end

      it 'returns 422 status' do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

end
