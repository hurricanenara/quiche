# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'iex-ruby-client'
require 'date'
require 'json' 

# test_file = File.read('./test.json')
# test_file = File.open "test.json"


# Asset.destroy_all
# Watchlist.destroy_all
# Transaction.destroy_all

if Asset.count == 0
  nyse = File.join(File.dirname(__FILE__), "nyse.json")
  nasdaq = File.join(File.dirname(__FILE__), "nasdaq.json")
  nyse_records = JSON.parse(File.read(nyse))
  nasdaq_records = JSON.parse(File.read(nasdaq))
  (nyse_records + nasdaq_records).each do |record|
    Asset.create!({
      ticker: record["Symbol"],
      asset_name: record["Company Name"]
    })
  end
  puts "assets are seeded"
end

# file = File.open "test.json"
# data = JSON.load file
# test_asset = data[0]

# Asset.create({
#   ticker: test_asset['Symbol'],
#   asset_name: test_asset['company_name']
# })

IEX::Api.configure do |config|
    config.publishable_token = 'Tpk_9cc6c16a40494338943d728d111e9998' # defaults to ENV['IEX_API_PUBLISHABLE_TOKEN']
    config.endpoint = 'https://sandbox.iexapis.com/v1'
end

client = IEX::Api::Client.new(
  publishable_token: 'Tpk_9cc6c16a40494338943d728d111e9998',
  endpoint: 'https://sandbox.iexapis.com/v1'
)