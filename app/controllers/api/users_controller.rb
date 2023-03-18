require 'iex-ruby-client'

class Api::UsersController < ApplicationController
    def create
        @current_user = current_user
        rand_tickers = ["GOOGL", "GE", "AAPL", "NFLX", "ETSY"]
        rand_sample = rand_tickers.sample
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            puts "User Created"
            Transaction.create({
                user_id: @user.id,
                transaction_type: "Deposit",
                transaction_amount: 1000000,
            })
            Portfolio.create({
                user_id: @current_user.id,
                balance: 1000000
            })
            IEX::Api.configure do |config|
                config.publishable_token = 'pk_9bae36c8264042f68549a11dc83620ac' # defaults to ENV['IEX_API_PUBLISHABLE_TOKEN']
                config.endpoint = 'https://cloud.iexapis.com/v1'
            end

            client = IEX::Api::Client.new(
            publishable_token: 'pk_9bae36c8264042f68549a11dc83620ac',
            endpoint: 'https://cloud.iexapis.com/v1'
            )
            rand_tickers.shuffle.each do |ticker|
                @quote = client.quote(ticker)
                Watchlist.create({
                    ticker: ticker,
                    user_id: @current_user.id,
                    asset_name: client.company(ticker).company_name,
                    latest_price: @quote.latest_price,
                    prev_close: @quote.previous_close,
                })
            end
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = User.find_by(id: params[:id])
    end

    private

    def user_params
        params.require(:user).permit(:email, :firstName, :lastName, :password)
    end

end