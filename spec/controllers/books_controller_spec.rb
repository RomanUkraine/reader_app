require 'rails_helper'

RSpec.describe BooksController, type: :controller do
  let!(:user)   { create(:user, :with_assigned_book) }
  let!(:book)   { create(:book) }
  let!(:header) {{ 'X-User-Token': user.authentication_token }}

  describe 'GET #index' do
    before(:each) do
      request.headers.merge! header
    end

    context 'books assigned to user' do
      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end

      it 'returns books assigned to user' do
        get :index, params: { my: true }
        res = JSON.parse(response.body)
        expect(res['data'][0]['id'].to_i).to eq(user.assigned_books.first.book_id)
      end
    end

    context 'all books' do
      before :each do
        get :index
      end

      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end

      it 'returns expected attributes JSON response' do
        res = JSON.parse(response.body)
        expect(res['data'][0]['attributes'].keys).to match_array(["id", "author", "title", "description"])
      end

      it 'returns correct (public) books' do
        res = JSON.parse(response.body)
        expect(res['data'][0]['attributes']['title']).to eq(book.title)
      end
    end
  end

  describe 'POST #create' do
    before(:each) do
      request.headers.merge! header
    end

    context 'with valid params' do
      let!(:valid_params) {{ book: { title: 'Title', description: 'lorem', author: 'John', public: true } }}

      it 'successfully creates a book' do
        expect{ post :create, params: valid_params }.to change{ Book.count }.by(1)
      end
    end

    context 'with invalid params' do
      let!(:invalid_params) {{ book: { title: nil, description: 'lorem', author: 'John', public: true } }}

      it 'does not create a book' do
        expect{ post :create, params: invalid_params }.not_to change{ Book.count }
      end

      it 'returns correct error message' do
        post :create, params: invalid_params
        res = JSON.parse(response.body)
        expect(res['error'][0]).to eq("Title can't be blank")
      end

      it 'returns 422 status' do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end
  end

end
