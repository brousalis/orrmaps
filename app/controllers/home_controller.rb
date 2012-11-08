class HomeController < ApplicationController

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
    else
      redirect_to "/server/#{underscore(session[:server])}"
      @map = Map.new
    end
    session[:alert] = "seen"
  end

end
