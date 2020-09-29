require 'time'

class Api::PortfoliosDataController < ApplicationController
    def index
        
    end

    def create
        # t.strftime('%I:%M %p')
        @last_portfo_data = PortfoData.last
        today = Time.now.strftime("%Y-%m-%d")
        market_open = "09:30 AM"
        
        new_day = @last_portfo_data.create_at.strftime("%Y-%m-%d") < today
        if new_day
            today_open = Time.parse("9:30 AM")
            @first_of_day = PortfoData.create({
                date: today,
                label: market_open,
                cash_balance: current_user.cash_balance || User.find(46).cash_balance
            })
        
        else
        end
    end
end
