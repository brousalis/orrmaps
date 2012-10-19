class HomeController < ApplicationController
  def index
    session[:server] = "Jade Quarry" if !session[:server]
    @server = Server.find_by_name(session[:server])
    @rated = rated(@server)

    if current_user
      if !current_user.map
        map = Map.new(:user => current_user, :server => @server)
        map.save
        @map = map

        user = current_user
        user.map = map
        user.save
      end
      @map = current_user.map
      session[:server] = current_user.server.name
    else
      @user = User.new unless current_user
      @map = Map.new unless current_user
    end
  end
end
