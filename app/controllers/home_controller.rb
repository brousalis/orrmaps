class HomeController < ApplicationController
  def index
    session[:server] = "Jade Quarry" if !session[:server]
    @server = Server.find_by_name(session[:server]) || "Jade Quarry"
    @servers = {:US => Server.select(:name).where(:country => 'US').order(:name),
                :EU => Server.select(:name).where(:country => 'EU').order(:name),
                :FR => Server.select(:name).where(:country => 'FR').order(:name),
                :GE => Server.select(:name).where(:country => 'GE').order(:name),
                :MX => Server.select(:name).where(:country => 'MX').order(:name)}

    @rated = rated(@server)

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
