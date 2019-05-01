class BookSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :author, :description
end
