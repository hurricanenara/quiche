class Api::PortfoDataController < ApplicationController
    def index
        portfo_data_params = params
        range = params["range"].upcase
        @current_user = current_user
        @current_time = Time.current
        @data
        if range == "1D"
            @data = PortfoDatum.where(created_at: @current_time.yesterday.all_day).where(user_id: @current_user.id).order('id ASC')
            if @current_time.saturday?
                @data = PortfoDatum.where(created_at: @current_time.yesterday.all_day).where(user_id: @current_user.id).order('id ASC')
                # @data = PortfoDatum.where('created_at >= ?', 1.days.ago).where(user_id: @current_user.id).order('id ASC')
            elsif @current_time.sunday?
                #    @data = PortfoDatum.where('created_at >= ?', 2.days.ago).where(user_id: @current_user.id).order('id ASC')
                @data = PortfoDatum.where(created_at: @current_time.yesterday.yesterday.all_day).where(user_id: @current_user.id).order('id ASC')
            elsif @current_time.monday && @current_time.hour < 9
                @data = PortfoDatum.where(created_at: @current_time.yesterday.yesterday.yesterday.all_day).where(user_id: @current_user.id).order('id ASC')
            else
                @data = PortfoDatum.where(created_at: Time.current.all_day, user_id: @current_user.id).order('created_at ASC')
            end
        elsif range == "1W"
            @data = PortfoDatum.where('created_at >= ?', 1.week.ago).where(user_id: @current_user.id).order('created_at ASC')
        elsif range == "1M"
            @data = PortfoDatum.where('created_at >= ?', 1.month.ago).where(user_id: @current_user.id).order('created_at ASC')
        elsif range == "3M"
            @data = PortfoDatum.where('created_at >= ?', 3.months.ago).where(user_id: @current_user.id, label: "3:55PM").order('created_at ASC')
        elsif range == "1Y"
            @data = PortfoDatum.where('created_at >= ?', 12.months.ago).where(user_id: @current_user.id, label: "3:55PM").order('created_at ASC')
        elsif range == "ALL"
            @data = PortfoDatum.where("DATE_PART('dow', created_at::date)=?", 2).where(label: "3:55 PM", user_id: @current_user.id).order('created_at ASC')
        end
        render json: { data: @data }
    end

    private
    def portfo_data_params
        params.permit(:range)
    end
end

