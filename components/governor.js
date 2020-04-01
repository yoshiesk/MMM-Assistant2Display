/** governor addon For A2D **/
/** bugsounet **/

const exec = require('child_process').exec

var _log = function() {
    var context = "[A2D:GOVERNOR]"
    return Function.prototype.bind.call(console.log, console, context)
}()

var log = function() {
  //do nothing
}

class GOVERNOR {
  constructor(config, callback) {
    this.config = config
    this.tunnel = callback.tunnel
    var debug = (this.config.debug) ? this.config.debug : false
    if (debug == true) log = _log
    this.debug = debug
    this.default = {
      governor: ""
    }
    this.config = Object.assign(this.default, this.config)
  }
  activate () {
    this.MyGovernor = [ "conservative", "ondemand" , "userspace" , "powersave" , "performance" ]
    this.Governor = {
      "actived" : false,
      "wanted" : "",
      "actual" : ""
    }
    log("Starts.")
    if (!this.config.governor) return log("Desactived.")
    else this.Governor.wanted = this.config.governor
    exec("cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor", (error, stdout, stderr) => {
      if (error) return log("Error: Incompatible with your system.")
      stdout= stdout.replace(/\n|\r|(\n\r)/g,'')
      this.Governor.actual = stdout
      log("Actual: " + this.Governor.actual)
      if (this.Governor.actual == this.Governor.wanted) return log("Already set.")
      else {
        for (let [item, value] of Object.entries(this.MyGovernor)) {
          if (value == this.Governor.wanted) {
            exec("echo " + value + " | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor")
            this.Governor.actived = true
            return log("Set: " +  value + ".")
          }
        }
        if (!this.Governor.actived) return log("Error: unknow Governor (" + this.config.governor + ").")
      }
    })
  }
}

module.exports = GOVERNOR