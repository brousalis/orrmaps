class HomeController < ApplicationController
  after_filter :set_alert, :only => :index

  def index
    session[:server] = "Jade Quarry" if !session[:server]
    @server = find_server(session[:server] || "Jade Quarry")
    @servers = servers

    if current_user
      if !current_user.map
        @map = Map.create(:user => current_user, :server => @server)
        current_user.update_attributes(:map => @map)
      else
        @map = current_user.map
      end

      session[:server] = current_user.server.name

      # god save my soul
      session[:count3] = 0 unless session[:count3].to_i > 0
      session[:count3] = session[:count3].to_i + 1 unless session[:count3] > 1
    else
      redirect_to "/server/#{underscore(session[:server])}"
      @map = Map.new
    end

  end

private

  def set_alert
    session[:alert3] = true if session[:count3].to_i == 1
  end

end
