class HomeController < ApplicationController
  def index
    session[:server] = "Jade Quarry" if !session[:server]
    @server = Server.find_by_name(session[:server]) || "Jade Quarry"
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
      @user = User.new
      @map = Map.new
    end
  end
end
