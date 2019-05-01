FactoryBot.define do
  factory :read_entry do
    pages { 20 }
    date  { Date.current }
  end
end
