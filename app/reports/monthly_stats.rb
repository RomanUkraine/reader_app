class MonthlyStats
  def initialize(user_id)
    @user = User.find(user_id)
  end

  def generate # TODO fix n+1
    arr ||= @user.read_entries.where(date: Date.current.beginning_of_month..Date.current.end_of_month)
                  .map { |e| { id:    e.book.id,
                               pages: e.pages,
                               book: {
                                        title:  e.book.title,
                                        author: e.book.author
                                      }
                              }
                        }

    arr.group_by { |item| item[:id] }
       .map do |id, items|
          page_sum = items.sum { |i| i[:pages] }
          Hash[:id, id, :book, items.first[:book], :pages, page_sum]
       end
  end

end
