FactoryBot.define do
  factory :user do
    email      { 'lorem@email.com' }
    token      { 'JHsUBvuzZyv_dFpa5keV' }
    first_name { 'John' }
    password   { '12345678' }
    password_confirmation { '12345678' }

    trait :with_assigned_book do
      after(:create) do |user|
        create(:assigned_book, user_id: user.id)
      end
    end
  end
end
